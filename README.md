# blockchain-module
This is the current custom domain of our project:
https://masariblockchain.vercel.app/

### Blockchain Project Context

We’re building an AI-powered off-price fashion marketplace that helps brands move excess inventory. To boost transparency and trust, we’re adding a separate on-chain verification module that lets brands verify product batches as excess stock.

This project is:

- **Simple and standalone**
- **Open-source** (while the rest of our repos are private)
- Will include:
    - A smart contract for verified batches
    - An **Admin Dashboard** for uploading batch attestations
    - A **Public Viewer** that shows a “Verified Excess Stock” badge on product pages

> You'll be working on the blockchain module first. Once it’s done, we’ll shift your focus to the main marketplace.
> 

### Tech Stack (Blockchain Project)

**Note:** this may change as development starts, so keep in touch with Shaad

- **Frontend:** Next.js + TailwindCSS (deployed on Vercel)
- **Smart Contracts:** Solidity on Polkadot-compatible EVM (e.g. Moonbeam)
- **Web3 Libraries:** Ethers.js or Polkadot.js
- **Optional (Admin Auth / Metadata):** Supabase
- **Tooling:** Hardhat for contract dev + testnet deployment

### Core Components You’ll Build

1. **Smart Contract**
    - Stores batchId, productIds, brandId, timestamp, and verified status
    - Read/write access with proper permissions
2. **Admin Interface**
    - Web dashboard for Masari or brands to verify excess batches via form or CSV
    - Connects to the smart contract to push attestations
3. **Public Viewer UI**
    - Simple component for shoppers/auditors to view verification badges
    - May include filters, tooltips, or detail views