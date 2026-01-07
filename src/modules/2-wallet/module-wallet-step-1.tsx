import { FC, useCallback, useState } from "react";
import { useKaspaStore } from "../../core/kaspa-store";
import { useWalletStore } from "../../core/wallet-store";
import { Mnemonic } from "kaspa-wasm";

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
  const balance = useWalletStore((s) => s.balance);
  const address = useWalletStore((s) => s.address);

  const walletStore = useWalletStore();

  const init = useKaspaStore((s) => s.init);
  const rpc = useKaspaStore((s) => s.kaspaClientInstance);

  const [step, setStep] = useState(0);
  const [createWalletStep, setCreateWalletStep] =
    useState<CreateWalletStepState | null>(null);

  const onCreateWallet = useCallback(async () => {
    const phrase = await walletStore.create(Mnemonic.random(24), "password");
    setCreateWalletStep({
      type: "confirmed",
      message: `Successfully created wallet, here is the mnemonic (seed phrase): ${phrase}`,
    });
  }, [walletStore.create]);

  const onOpenWallet = useCallback(async () => {
    await walletStore.unlock("password");
  }, [walletStore]);

  const onImportWallet = useCallback(async () => {
    setCreateWalletStep({ type: "import" });
  }, []);

  const onSubmitImport = useCallback(
    // @ts-ignore
    async (e) => {
      const value = e.target[0].value;
      e.preventDefault();
      try {
        await walletStore.create(value, "password");

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
    [walletStore],
  );

  const onShowWallet = useCallback(async () => {
    if (!rpc.connected) {
      await init();
    }

    setStep((prev) => prev + 1);

    await walletStore.start(rpc, walletStore.unlockedWallet!);
  }, [walletStore, rpc, init]);

  const onNextStepClicked = useCallback(async () => {
    if (createWalletStep?.type === "confirmed") {
      if (!rpc.connected) {
        await init();
      }

      await walletStore.start(rpc, walletStore.unlockedWallet!);
    }

    setStep((prev) => prev + 1);
  }, [createWalletStep, init, rpc, walletStore]);

  const onResetClicked = useCallback(async () => {
    walletStore.flush();
  }, [walletStore]);

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
        {!walletStore.doesExists ? (
          <>
            <button onClick={onCreateWallet}>Create a Wallet</button>
            <p>OR</p>
            <button onClick={onImportWallet}>Import a Wallet</button>
          </>
        ) : walletStore.unlockedWallet !== null ? (
          <>
            <button onClick={onShowWallet}>Show Wallet</button>
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
            {address?.toString()}
          </code>
        </p>

        <>
          <p>Mature Balance: {balance}</p>
        </>
      </div>
    );
  }
};
