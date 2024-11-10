// utils/transaction.js
export async function createTransaction(prompt: string, address: string) {
    const response = await fetch(
        "https://api.brianknows.org/api/v0/agent/transaction",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-brian-api-key":
                    process.env.BRIAN || "brian_vsk4q2It0VONz1nI7",
            } as any,
            body: JSON.stringify({
                prompt,
                address,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}
