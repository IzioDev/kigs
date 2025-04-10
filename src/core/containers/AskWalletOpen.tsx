import { FC, useCallback, useState } from "react";
import { useKaspaStore } from "../kaspa-store";
import { Status } from "../wallet";
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

export const AskWalletOpen: FC<{ onOpened?: () => void }> = ({ onOpened }) => {
  const walletStorage = useKaspaStore((s) => s.walletStorage);
  const walletStorageStatus = useKaspaStore((s) => s.walletStorage.status);

  const [createWalletStep, setCreateWalletStep] =
    useState<CreateWalletStepState | null>(null);

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

  if (walletStorageStatus === Status.Unlocked) {
    onOpened ? onOpened() : null;
    return null;
  }

  if (createWalletStep) {
    return (
      <div className="flex gap-4 items-center justify-center w-2/4 h-full">
        {createWalletStep.type === "import" ? (
          <form
            className="flex gap-4 flex-col items-center justify-center w-3/4"
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
          <div className="flex flex-col gap-4 items-center justify-center w-3/4">
            <p className="select-text">{createWalletStep.message}</p>

            <button onClick={onOpened}>Next</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center justify-center w-2/4 h-full">
      {walletStorageStatus === Status.Uninitialized ? (
        <>
          <button onClick={onCreateWallet}>Create a Wallet</button>
          <p>OR</p>
          <button onClick={onImportWallet}>Import a Wallet</button>
        </>
      ) : walletStorageStatus === Status.Locked ? (
        <button onClick={onOpenWallet}>Open the Wallet</button>
      ) : null}
    </div>
  );
};
