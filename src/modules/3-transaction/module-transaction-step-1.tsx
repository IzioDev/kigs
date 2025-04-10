import { FC, useCallback, useEffect, useState } from "react";
import { Status } from "../../core/wallet";
import { useKaspaStore } from "../../core/kaspa-store";
import { useEventEmitter } from "../../core/hooks/use-event-emitter";
import { AskWalletOpen } from "../../core/containers/AskWalletOpen";

type ModuleTransactionStep1Props = {};

export const ModuleTransactionStep1: FC<ModuleTransactionStep1Props> = ({}) => {
  const walletStorageStatus = useKaspaStore((s) => s.walletStorage.status);
  const account = useKaspaStore((s) => s.account);

  const init = useKaspaStore((s) => s.init);

  const [step, setStep] = useState(0);

  const [balance, setBalance] = useState(account.balance);

  const [firstUtxo, setFirstUtxo] = useState<
    | undefined
    | null
    | {
        amount: bigint;
        toAddress: string;
        blockDaaScore: bigint;
        transactionId: string;
      }
  >(undefined);

  const onNextStep = useCallback(async () => {
    setStep(step + 1);
  }, [step]);

  useEventEmitter(account, "balance", (balance) => {
    setBalance(balance);
  });

  useEffect(() => {
    init();
  }, []);

  const onLoadFirstUtxo = useCallback(() => {
    const firstUtxo = account.context.getMatureRange(0, 1).at(0);

    if (!firstUtxo) {
      setFirstUtxo(null);
      return;
    }

    setFirstUtxo({
      amount: firstUtxo.amount,
      blockDaaScore: firstUtxo.blockDaaScore,
      toAddress: firstUtxo.address?.toString() ?? "unknown",
      transactionId: firstUtxo.outpoint.transactionId,
    });
  }, [account]);

  if (walletStorageStatus !== Status.Unlocked) {
    return <AskWalletOpen />;
  }

  if (step === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-center">
          Kaspa (testnet) Receive Address:{" "}
          <code className="select-text block break-all px-4 2xl:px-0">
            {account?.addresses?.receiveAddresses?.at(0)}
          </code>
        </p>

        <p>Mature Balance: {balance}</p>

        {!firstUtxo ? (
          <button onClick={onLoadFirstUtxo}>Load UTXO Details</button>
        ) : (
          <div className="mt-4 flex flex-col items-center">
            <h3 className="font-bold text-center">UTXO details</h3>
            <p className="text-center font-bold pt-2">
              Transaction Id:{" "}
              <code className="font-normal block break-all px-4 2xl:px-0">
                {firstUtxo.transactionId}
              </code>
            </p>
            <p className="text-center font-bold pt-2">
              Amount:{" "}
              <span className="font-normal">
                {Number(firstUtxo.amount.toString()) / 100000000}
              </span>
            </p>
            <p className="text-center font-bold pt-2">
              Block DAA Score:{" "}
              <span className="font-normal">{firstUtxo.blockDaaScore}</span>
            </p>
            <p className="text-center font-bold pt-2">
              Recipiant:
              <code className="font-normal block break-all px-4 2xl:px-0">
                {firstUtxo.toAddress}
              </code>
            </p>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://explorer-tn10.kaspa.org/txs/${firstUtxo.transactionId}`}
              className="mt-4 inline-block"
            >
              See my transaction on the Kaspa Explorer
            </a>
          </div>
        )}
      </div>
    );
  }
};
