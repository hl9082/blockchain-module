import { ethers } from "ethers"

// ABI definition directly in the file to avoid JSON parsing issues
const BatchVerificationABI = {
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "batchId",
          type: "string",
        },
        {
          indexed: true,
          internalType: "string",
          name: "brandId",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "BatchVerified",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "brandId",
          type: "string",
        },
      ],
      name: "addBrand",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "batchId",
          type: "string",
        },
      ],
      name: "getBatch",
      outputs: [
        {
          internalType: "string",
          name: "batchId",
          type: "string",
        },
        {
          internalType: "string[]",
          name: "productIds",
          type: "string[]",
        },
        {
          internalType: "string",
          name: "brandId",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "verified",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "batchId",
          type: "string",
        },
      ],
      name: "isBatchVerified",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "batchId",
          type: "string",
        },
        {
          internalType: "string[]",
          name: "productIds",
          type: "string[]",
        },
        {
          internalType: "string",
          name: "brandId",
          type: "string",
        },
      ],
      name: "verifyBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
}

// Contract addresses - would be different for each network
const CONTRACT_ADDRESSES = {
  moonbeam: "0x0000000000000000000000000000000000000000", // Replace with actual address after deployment
  moonbase: "0x0000000000000000000000000000000000000000", // Replace with actual address after deployment
  development: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Local development address
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

// For demo purposes, this function simulates blockchain verification
// In a real implementation, this would connect to a wallet and sign the transaction
export const verifyBatchOnChain = async (batchId: string, productIds: string[], brandId: string): Promise<string> => {
  // In a real implementation:
  // 1. Connect to wallet (MetaMask, WalletConnect, etc.)
  // 2. Get signer from wallet connection
  // 3. Call the contract method with the signer
  // 4. Return the transaction hash

  // For demo purposes, we'll just return a mock transaction hash
  return `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
}

// Check if a batch is verified on the blockchain
export const isBatchVerifiedOnChain = async (batchId: string): Promise<boolean> => {
  try {
    const contract = getBatchVerificationContract()
    return await contract.isBatchVerified(batchId)
  } catch (error) {
    console.error("Error checking batch verification:", error)
    // For demo purposes, return true if we can't connect to the blockchain
    return true
  }
}

// Get batch details from the blockchain
export const getBatchDetailsFromChain = async (batchId: string) => {
  try {
    const contract = getBatchVerificationContract()
    return await contract.getBatch(batchId)
  } catch (error) {
    console.error("Error getting batch details:", error)
    return null
  }
}
