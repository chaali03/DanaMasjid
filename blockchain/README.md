# Blockchain Setup for DanaMasjid Transparency & Supply Chain

Repository ini berisi infrastruktur blockchain untuk meningkatkan transparansi donasi dan pelacakan aset (supply chain) di platform DanaMasjid.

## Fitur Smart Contract (`SupplyChain.sol`)
1. **Record Donation**: Mencatat setiap donasi secara permanen di blockchain dengan ID donasi, alamat pengirim (donor), jumlah, dan tujuan donasi.
2. **Item Creation**: Memungkinkan admin untuk membuat item aset (misalnya semen, besi, atau paket makanan) untuk dilacak.
3. **Item Tracking**: Melacak status item (Created, InTransit, Delivered, Distributed) untuk memastikan bantuan sampai ke penerima yang tepat.

## Persyaratan
- Node.js (v18+)
- npm

## Cara Menjalankan
1. **Instal Dependensi**:
   ```bash
   cd blockchain
   npm install
   ```

2. **Jalankan Node Lokal (Hardhat)**:
   ```bash
   npx hardhat node
   ```

3. **Deploy Smart Contract**:
   Di terminal baru:
   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

4. **Jalankan Tes**:
   ```bash
   npx hardhat test
   ```

## Integrasi dengan Backend (API)
Gunakan `BlockchainService` yang ada di `api/src/utils/blockchainService.ts`.
Konfigurasikan `.env` di direktori `api/`:
- `BLOCKCHAIN_RPC_URL`: Alamat node (default: `http://localhost:8545`)
- `BLOCKCHAIN_PRIVATE_KEY`: Private key dari salah satu akun Hardhat (bisa diambil dari output `npx hardhat node`)
- `BLOCKCHAIN_CONTRACT_ADDRESS`: Alamat kontrak yang muncul setelah menjalankan script deploy.
