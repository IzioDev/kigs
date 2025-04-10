import { FC, useCallback, useState } from "react";
import { Status } from "../../core/wallet";
import { useKaspaStore } from "../../core/kaspa-store";
import { useEventEmitter } from "../../core/hooks/use-event-emitter";

type ModuleWalletStep1Props = {};

type CreateWalletStepState =
  | {
      type: "import";
      mnemonic?: string;
      error?: string;
    }
  | {
      type: "confirmed";
      message: string;
    };

export const ModuleWalletStep1: FC<ModuleWalletStep1Props> = ({}) => {
  const walletStorage = useKaspaStore((s) => s.walletStorage);
  const walletStorageStatus = useKaspaStore((s) => s.walletStorage.status);
  const account = useKaspaStore((s) => s.account);

  const init = useKaspaStore((s) => s.init);
  const rpc = useKaspaStore((s) => s.kaspaClient);
  const [isRpcConnected, setIsRpcConnected] = useState(rpc.isConnected);

  const [step, setStep] = useState(0);
  const [createWalletStep, setCreateWalletStep] =
    useState<CreateWalletStepState | null>(null);

  const [balance, setBalance] = useState(account.balance);

  const onCreateWallet = useCallback(async () => {
    const phrase = await walletStorage.create("password");
    setCreateWalletStep({
      type: "confirmed",
      message: `Successfully created wallet, here is the mnemonic (seed phrase): ${phrase}`,
    });
  }, []);

  const onOpenWallet = useCallback(async () => {
    await walletStorage.unlock(0, "password");
  }, [walletStorage]);

  const onImportWallet = useCallback(async () => {
    setCreateWalletStep({ type: "import" });
  }, []);

  const onSubmitImport = useCallback(
    // @ts-ignore
    async (e) => {
      const value = e.target[0].value;
      e.preventDefault();
      try {
        await walletStorage.import(value, "password");

        setCreateWalletStep({
          type: "confirmed",
          message: "Successfully imported wallet",
        });
      } catch (error) {
        setCreateWalletStep({
          type: "import",
          mnemonic: value,
          error: (error as any).toString(),
        });
      }
    },
    [walletStorage]
  );

  const onNextStepClicked = useCallback(async () => {
    setStep(step + 1);
  }, [step]);

  const onResetClicked = useCallback(async () => {
    await walletStorage.reset();
  }, [walletStorage]);

  const onConnectClicked = useCallback(async () => {
    if (!rpc.isConnected) await init();

    setIsRpcConnected(true);
  }, [init]);

  useEventEmitter(account, "balance", (balance) => {
    setBalance(balance);
  });

  if (step === 0) {
    if (createWalletStep) {
      return (
        <div className="flex gap-4 items-center justify-center w-100">
          {createWalletStep.type === "import" ? (
            <form
              className="flex gap-4 flex-col items-center justify-center"
              onSubmit={onSubmitImport}
            >
              <div>
                <textarea name="mnemonic" required />
                {createWalletStep.error ? (
                  <p className="text-red-500">{createWalletStep.error}</p>
                ) : null}
              </div>

              <button type="submit">Import Wallet</button>
            </form>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center">
              <p className="select-text">{createWalletStep.message}</p>

              <button onClick={onNextStepClicked}>Next</button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex gap-4 items-center justify-center">
        {walletStorageStatus === Status.Uninitialized ? (
          <>
            <button onClick={onCreateWallet}>Create a Wallet</button>
            <p>OR</p>
            <button onClick={onImportWallet}>Import a Wallet</button>
          </>
        ) : walletStorageStatus === Status.Unlocked ? (
          <>
            <button onClick={onNextStepClicked}>Show Wallet</button>
            <p>OR</p>
            <button onClick={onResetClicked}>Reset the Wallet</button>
          </>
        ) : (
          <button onClick={onOpenWallet}>Open the Wallet</button>
        )}
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center w-100">
        <p className="text-center">
          Kaspa (testnet) Receive Address:{" "}
          <code className="select-text block break-all px-4 2xl:px-0">
            {account?.addresses?.receiveAddresses?.at(0)}
          </code>
        </p>

        {isRpcConnected ? (
          <>
            <p>Mature Balance: {balance}</p>
          </>
        ) : (
          <button onClick={onConnectClicked}>Connect to check balance</button>
        )}
      </div>
    );
  }
};
