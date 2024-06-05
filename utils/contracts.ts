import { getContract } from "thirdweb";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { SUSD_STAKING_CONTRACT_ABI } from "./susdPoolContractABI";



const sosusdtTokenContractAddress = "0x0554349dD7F50C0eAC4791eec64dDDDC109AbA98";
const usdcTokenContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const susdPoolContractAddress = "0xed945F6c6951DFbc6486EE08697f182e0f7D4693";




export const SOSUSDT_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: sosusdtTokenContractAddress,
});

export const USDC_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: usdcTokenContractAddress,
});

export const SUSD_STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: susdPoolContractAddress,
    abi: SUSD_STAKING_CONTRACT_ABI,
});

