@echo off

for %%f in (.\res\*.wasm) do (
    call near delete %%~nf.cryptosketches.testnet cryptosketches.testnet

    call near create-account %%~nf.cryptosketches.testnet --masterAccount cryptosketches.testnet

    call near deploy %%~nf.cryptosketches.testnet %%f --initFunction new --initArgs "{""owner"": ""%%~nf.cryptosketches.testnet""}"
)
