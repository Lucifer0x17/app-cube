


export const exectueTransaction = async (step: any, primaryWallet: any) => {

    const walletClient = await primaryWallet.getWalletClient();

    console.log("state", step.chainId);

    const hash = await walletClient.sendTransaction({

        to: step.to,
        value: step.value,
        from: step.from,
        chainId: step.chainId,
        data: step.data ? step.data : "",

    })
    return hash;
}