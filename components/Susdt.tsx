'use client'

import Image from "next/image";
import sosusdt from "./sosusdt-logo.png";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton } from "@/app/thirdweb"
import { SOSUSDT_TOKEN_CONTRACT, SUSD_STAKING_CONTRACT, USDC_TOKEN_CONTRACT, } from "../utils/contracts";
import { approve, balanceOf } from "thirdweb/extensions/erc20";
import { useReadContract, useActiveAccount, TransactionButton } from "thirdweb/react";
import { useEffect, useState } from "react";
import { prepareContractCall, toEther, toWei } from "thirdweb";

export const Susdt = () => {
    const account = useActiveAccount();

    const [stakeAmount, setStakeAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [stakingState, setStakingState] = useState("init" || "approved");
    const [isStaking, setIsStaking] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const { 
        data: sosusdtTokenBalance, 
        isLoading: loadingSosusdtTokenBalance,
        refetch: refetchSosusdtTokenBalance,
    } = useReadContract (
        balanceOf,
        {
            contract: SOSUSDT_TOKEN_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account,
            }
        }
    );

    const { 
        data: usdcTokenBalance, 
        isLoading: loadingUsdcTokenBalance,
        refetch: refetchUsdcTokenBalance,
    } = useReadContract (
        balanceOf,
        {
            contract: USDC_TOKEN_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account,
            }
        }
    );

    const {
        data: stakeInfo,
        refetch: refetchStakeInfo,
    } = useReadContract ({
        contract: SUSD_STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
        queryOptions: {
            enabled: !!account,
        }
    });

    function truncate(value: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(value);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be convertible to a number.')
        }
        const factor: number = Math.pow(10, decimalPlaces);
        return Math.trunc(numericValue * factor) / factor;
    };

    useEffect(() => {
        setInterval(() => {
            refetchStakeInfo();
        }, 10000);
    }, []);
    

    function refetchRewardTokenBalance() {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            {account && (
                <div 
                style={{
                    backgroundColor: "#151515",
                    padding: "40px",
                    borderRadius: "10px",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        
                            <div>
                                <Image
                                src={sosusdt}
                                alt='sosusdt'
                                height='40'/>
                            </div>
                        
                        
                            <div style={{
                                justifyContent: "end",
                                textAlign: "end",
                                margin: "10px"
                            }}>
                                <p style={{
                                    fontSize: "28px",
                                    fontWeight: "bold"
                                }}>
                                    sosUSDT POOL
                                </p>
                                <p 
                                style={{fontSize: "10px",
                                    
                                }}>
                                    Earn 0.00001 USDC/Hr for every 1 sosUSDT you deposit.
                                </p>
                            </div>
                            
                        
                        
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginTop: "20px",
                    }}>
                        <p style={{
                            fontSize: "10px"
                        }}>
                            sosUSDT in my wallet:
                        </p>
                        {loadingSosusdtTokenBalance ? (
                            <h2>Loading...</h2>
                        ) : (
                            
                            <p style={{
                                fontSize: "62px",
                                fontWeight: "bold"
                            }}>{truncate(toEther(sosusdtTokenBalance!),2)}</p>
                            
                            
                        )}
                        
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        marginTop: "20px",
                    }}>
                        
                        
                    </div>
                        
                    {stakeInfo && (
                        <>
                    
                    <p style={{
                        fontSize:"10px"
                    }}>sosUSDT Deposited:</p>
                    <div style={{
                        display: "flex",
                        alignItems: "baseline"
                        
                    }}>
                        <p style={{
                            fontSize: "62px",
                            fontWeight: "bold"
                        }}>
                            {truncate(toEther(stakeInfo[0]).toString(),2)}</p>
                        <p style={{
                            marginLeft: "6px",
                            fontSize: "12px"
                        }}>
                            sosUSDT
                        </p>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <button 
                            style={{
                            marginTop: "20px",
                            padding: "10px",
                            backgroundColor: "red",
                            border: "none",
                            borderRadius: "6px",
                            color: "white",
                            fontSize: "1rem",
                            width: "50%",
                            height: "60px",
                            cursor: "pointer"

                                }}
                                onClick={() => setIsStaking(true)}

                                >Deposit</button>
                                <button
                                style={{
                                    marginTop: "20px",
                                    marginLeft: "10px",
                                    padding: "10px",
                                    backgroundColor: "red",
                                    border: "none",
                                    borderRadius: "6px",
                                    color: "white",
                                    fontSize: "1rem",
                                    width: "50%",
                                    height: "60px",
                                    cursor: "pointer"

                                }}
                                onClick={() => setIsWithdrawing(true)}
                                >Withdraw</button>
                            </div>
                            <div style={{
                                marginTop: "40px",
                                
                            }}>
                                
                                
                                    <p>Unclaimed Rewards: </p>
                                        <div  style={{
                        display: "flex",
                        alignItems: "baseline"}}
                        >
                                        <p style={{
                                            fontSize: "62px",
                                            fontWeight: "bold",
                                            
                                        }}>{truncate(toEther(stakeInfo[1]).toString(),2)}</p>
                                        <p style={{
                                                marginLeft: "6px",
                                                fontSize: "12px"
                                            }}>
                                                USDC
                                            </p>
                                </div>
                                <div style={{
                                    marginTop: "10px"
                                }}>
                                    <TransactionButton style={{
                                        width:"100%",
                                        height: "60px",
                                        backgroundColor: "red",
                                        color: "white",
                                    }}
                                        transaction={() => (
                                            prepareContractCall({
                                                contract: SUSD_STAKING_CONTRACT,
                                                method: "claimRewards",
                                            })
                                        )}
                                        onTransactionConfirmed={() => {
                                            refetchUsdcTokenBalance();
                                            refetchStakeInfo();
                                        }}
                                    >
                                        Claim Reward
                                    </TransactionButton>
                                </div>
                            </div>
                           </>
                        )}
                        {isWithdrawing && (
                            <div style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#151515",
                                    padding: "40px",
                                    borderRadius: "10px",
                                    minWidth: "300px"
                                }}>
                                    <button 
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                        padding: "5px",
                                        margin: "5px",
                                        fontSize: "0.5rem"
                                    }}
                                    onClick={() => setIsWithdrawing(false)}
                                    >
                                        X
                                    </button>
                                    <h3>
                                        Withdraw sosUSDT 
                                    </h3>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Available to deposit:
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "baseline"}}>
                                        <p
                                        style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(sosusdtTokenBalance!),2)} </p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>sosUSDT</p>
                                    </div>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Available to withdraw:</p>
                                        
                                    <div style={{
                        display: "flex",
                        alignItems: "baseline"}}>
                                        <p style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(stakeInfo![0]).toString(),2)}</p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>sosUSDT</p>
                                    </div>
                                    <input
                                    type="number"
                                    placeholder="0.0"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                    style={{
                                        marginTop: "10px",
                                        padding: "5px",
                                        borderRadius: "5px",
                                        border: "1px solid #333",
                                        width: "100%",
                                    }}
                                    />
                                    <TransactionButton style={{
                                        marginTop: "10px",
                                        backgroundColor: "red",
                                        color: "white",
                                    }}
                                    transaction={() => ( 
                                        prepareContractCall({
                                            contract: SUSD_STAKING_CONTRACT,
                                            method: "withdraw",
                                            params: [toWei(withdrawAmount.toString())],
                                        })
                                    )}
                                    onTransactionConfirmed={() => {
                                        setWithdrawAmount(0);
                                        refetchStakeInfo();
                                        refetchSosusdtTokenBalance();
                                        setIsWithdrawing(false);
                                    }}
                                    >Withdraw</TransactionButton>
                                </div>
                            </div>
                        )}
                        {isStaking && (
                            <div style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#151515",
                                    padding: "40px",
                                    borderRadius: "10px",
                                    minWidth: "300px"
                                }}>
                                    <button 
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                        padding: "5px",
                                        margin: "5px",
                                        fontSize: "0.5rem"
                                    }}
                                    onClick={() => setIsStaking(false)}
                                    >
                                        X
                                    </button>
                                    <h3>
                                        Deposit sosUSDT 
                                    </h3>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Available to deposit:
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "baseline"}}>
                                        <p
                                        style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(sosusdtTokenBalance!),2)} </p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>sosUSDT</p>
                                    </div>
                                    
                                    <p style={{
                                        fontSize: "10px",
                                        marginTop: "10px"
                                    }}>Deposited</p>
                                        
                                    <div style={{
                        display: "flex",
                        alignItems: "baseline"}}>
                                        <p style={{
                                            fontSize: "36px"
                                        }}>{truncate(toEther(stakeInfo![0]).toString(),2)}</p>
                                        <p style={{
                                            fontSize: "10px",
                                            marginLeft: "4px"
                                            }}>sosUSDT</p>
                                    </div>
                                    {stakingState === "init" ? (
                                        <>
                                        <input 
                                            type="number" 
                                            placeholder="0.0" 
                                            value={stakeAmount} 
                                            onChange={(e) => setStakeAmount(Number(e.target.value))}
                                            style={{
                                                marginTop: "10px",
                                                padding: "5px",
                                                borderRadius: "5px",
                                                border: "1px solid #333",
                                                width: "100%",
                                            }}
                                        />

                                        <TransactionButton 
                                            transaction={() => (
                                                approve({
                                                    contract: SOSUSDT_TOKEN_CONTRACT,
                                                    spender: SUSD_STAKING_CONTRACT.address,
                                                    amount: stakeAmount,
                                                })
                                            )}
                                            onTransactionConfirmed={() => (
                                                setStakingState("approved")
                                            )}
                                            style={{
                                                width: "100%",
                                                margin: "10px 0",
                                                backgroundColor: "red",
                                            color: "white",
                                            }}
                                            >
                                                Approve
                                            </TransactionButton>
                                        
                                    </>
                                    ) : (
                                    <>
                                    <h3 style={{margin: "10px 0"}}>{stakeAmount}</h3>
                                    <TransactionButton
                                     transaction={() => (
                                        prepareContractCall({
                                            contract: SUSD_STAKING_CONTRACT,
                                            method: "stake",
                                            params: [toWei(stakeAmount.toString())]
                                        })
                                     )}
                                     onTransactionConfirmed={() => {
                                        setStakeAmount(0);
                                        setStakingState("init");
                                        refetchStakeInfo();
                                        refetchSosusdtTokenBalance();
                                        setIsStaking(false)
                                     }}
                                     >
                                        Deposit
                                    </TransactionButton>
                                    </>    
                                    )}

                                </div>
                            </div>
                        )}
                        
                        
                </div>
)}
                <div>

                </div>
            
        </div>
    )
}