import { FC, useCallback, useEffect, useState } from "react";
import { useKaspaStore } from "../../core/kaspa-store";
import { AskWalletOpen } from "../../core/containers/AskWalletOpen";
import { useWalletStore } from "../../core/wallet-store";

type ModuleTransactionStep1Props = {};

export const ModuleTransactionStep1: FC<ModuleTransactionStep1Props> = ({}) => {
  const balance = useWalletStore((s) => s.balance);
  const address = useWalletStore((s) => s.address);

  const walletStore = useWalletStore();

  const unlockedWallet = useWalletStore((s) => s.unlockedWallet);

  const kaspaClientInstance = useKaspaStore((s) => s.kaspaClientInstance);
  const init = useKaspaStore((s) => s.init);

  const [step, setStep] = useState(0);

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

  useEffect(() => {
    if (unlockedWallet) {
      if (!kaspaClientInstance.connected) {
        init().then(() => {
          walletStore.start(kaspaClientInstance, unlockedWallet);
        });
      }
    }
  }, [unlockedWallet]);

  const onLoadFirstUtxo = useCallback(() => {
    const firstUtxo = walletStore.getMatureUtxos().at(0);

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
  }, [walletStore]);

  if (!walletStore.unlockedWallet) {
    return <AskWalletOpen />;
  }

  if (step === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-center">
          Kaspa (testnet) Receive Address:{" "}
          <code className="select-text block break-all px-4 2xl:px-0">
            {address?.toString()}
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
