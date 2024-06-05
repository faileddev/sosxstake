import { getContract } from "thirdweb";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { SUSD_STAKING_CONTRACT_ABI } from "./susdPoolContractABI";



const sosusdtTokenContractAddress = "0x0554349dD7F50C0eAC4791eec64dDDDC109AbA98";
const usdcTokenContractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const susdPoolContractAddress = "0x549f3E5aA3F8Af74493d36f945fe3f0328A2779F";




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

