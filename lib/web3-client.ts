import { ethers } from "ethers"
import BatchVerificationABI from "@/contracts/BatchVerification.json"

// Contract addresses - would be different for each network
const CONTRACT_ADDRESSES = {
  moonbeam: "0x0000000000000000000000000000000000000000", // Replace with actual address after deployment
  moonbase: "0x0000000000000000000000000000000000000000", // Replace with actual address after deployment
  development: "0x0000000000000000000000000000000000000000", // Replace with actual address after deployment
}

// Get the appropriate contract address based on the environment
const getContractAddress = () => {
  const env = process.env.NEXT_PUBLIC_BLOCKCHAIN_ENVIRONMENT || "development"
  return CONTRACT_ADDRESSES[env as keyof typeof CONTRACT_ADDRESSES]
}

// Create a provider based on the environment
export const getProvider = () => {
  const env = process.env.NEXT_PUBLIC_BLOCKCHAIN_ENVIRONMENT || "development"

  if (env === "development") {
    // Local development provider
    return new ethers.JsonRpcProvider("http://localhost:8545")
  } else if (env === "moonbase") {
    // Moonbase Alpha testnet
    return new ethers.JsonRpcProvider("https://rpc.api.moonbase.moonbeam.network")
  } else if (env === "moonbeam") {
    // Moonbeam mainnet
    return new ethers.JsonRpcProvider("https://rpc.api.moonbeam.network")
  }

  throw new Error(`Unsupported environment: ${env}`)
}

// Create a contract instance
export const getBatchVerificationContract = (signerOrProvider?: ethers.Signer | ethers.Provider) => {
  const provider = signerOrProvider || getProvider()
  const contractAddress = getContractAddress()

  return new ethers.Contract(contractAddress, BatchVerificationABI.abi, provider)
}

// Verify a batch on the blockchain
export const verifyBatch = async (batchId: string, productIds: string[], brandId: string, signer: ethers.Signer) => {
  const contract = getBatchVerificationContract(signer)

  const tx = await contract.verifyBatch(batchId, productIds, brandId)

  return await tx.wait()
}

// Check if a batch is verified
export const isBatchVerified = async (batchId: string) => {
  const contract = getBatchVerificationContract()
  return await contract.isBatchVerified(batchId)
}

// Get batch details
export const getBatchDetails = async (batchId: string) => {
  const contract = getBatchVerificationContract()
  return await contract.getBatch(batchId)
}
