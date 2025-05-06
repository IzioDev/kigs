import { FC, useCallback, useState } from "react";
import { useKaspaStore } from "../../core/kaspa-store";
import { IGetBlockDagInfoResponse, IGetInfoResponse } from "kaspa-wasm";

type ModuleNetworkStep1Props = {};

export const ModuleNetworkStep2: FC<ModuleNetworkStep1Props> = ({}) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [peerInfo, setPeerInfo] = useState<IGetInfoResponse | null>(null);
  const [dagInfo, setDagInfo] = useState<IGetBlockDagInfoResponse | null>(null);

  const init = useKaspaStore((state) => state.init);

  const rpc = useKaspaStore((state) => state.kaspaClientInstance);

  const onConnectClicked = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    await init();

    setStep(1);

    setIsLoading(false);
  }, [isLoading]);

  const onNodeInfoClicked = useCallback(async () => {
    const [info, dagInfo] = await Promise.all([
      rpc.rpc?.getInfo(),
      rpc.rpc?.getBlockDagInfo(),
    ]);

    setPeerInfo(info!);
    setDagInfo(dagInfo!);
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (step === 0) {
    return (
      <div className="flex items-center justify-center">
        <button onClick={onConnectClicked}>Connect to Testnet</button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <p>Connected.</p>

        {peerInfo !== null && dagInfo !== null ? (
          <div className="text-center">
            <p>Is the node fully-synced? {peerInfo.isSynced ? "yes" : "no"}</p>
            <p>
              Does it have UTXO Index? {peerInfo.isUtxoIndexed ? "yes" : "no"}
            </p>
            <p>Mempool Size: {peerInfo.mempoolSize}</p>
            <p>Version: {peerInfo.serverVersion}</p>
            <p>Block Count: {dagInfo.blockCount}</p>
          </div>
        ) : null}

        <button onClick={onNodeInfoClicked}>Request Node Infos</button>
      </div>
    );
  }
};
