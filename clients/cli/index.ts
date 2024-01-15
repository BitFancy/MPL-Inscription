import { inscribe_nfts } from './commands/inscribe/nft.js';
import { create_shards } from './commands/create/shards.js';
import { PublicKey, publicKey } from '@metaplex-foundation/umi';
import { readFileSync } from 'fs';
import { download_nfts } from './commands/download/nft.js';

import { Command } from 'commander';
import { test_createCollection } from './commands/test/createCollection.js';
import { cost_nfts } from './commands/cost/nft.js';

const program = new Command();

program
    .name('Metaplex Inscription CLI')
    .description('CLI to manage Inscriptions')
    .version('0.1.0');

const inscribeCmd = program.command('inscribe');

inscribeCmd.command('nft')
    .description('Inscribe an existing NFT')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-k --keypair <string>', 'Solana wallet location')
    .option('-m --mint <string>', 'Mint address of the NFT')
    .option('-c --concurrency <number>', 'Number of concurrent writes to perform', '10')
    .action(async (str, options) => {
        const { rpc, keypair, mint, concurrency } = options.opts();
        await inscribe_nfts(rpc, keypair, [publicKey(mint)], parseInt(concurrency));
    });

inscribeCmd.command('hashlist')
    .description('Inscribe an existing NFT')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-k --keypair <string>', 'Solana wallet location')
    .option('-h --hashlist <string>', 'The file containing the hashlist')
    .option('-c --concurrency <number>', 'Number of concurrent writes to perform', '10')
    .action(async (str, options) => {
        const { rpc, keypair, hashlist, concurrency } = options.opts();

        const hashlistArray = JSON.parse(readFileSync(hashlist, 'utf-8'));
        const mints: PublicKey[] = hashlistArray.map((mint: string) => publicKey(mint));

        await inscribe_nfts(rpc, keypair, mints, parseInt(concurrency));
    });

const downloadCmd = program.command('download');

downloadCmd.command('nft')
    .description('Download an existing NFT\'s data')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-k --keypair <string>', 'Solana wallet location')
    .option('-m --mint <string>', 'Mint address of the NFT')
    .option('-c --concurrency <number>', 'Number of concurrent writes to perform', '10')
    .action(async (str, options) => {
        const { rpc, keypair, mint, concurrency } = options.opts();

        await download_nfts(rpc, keypair, [publicKey(mint)], parseInt(concurrency));
    });

downloadCmd.command('hashlist')
    .description('Download an existing NFT\'s data')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-k --keypair <string>', 'Solana wallet location')
    .option('-h --hashlist <string>', 'The file containing the hashlist')
    .option('-c --concurrency <number>', 'Number of concurrent writes to perform', '10')
    .action(async (str, options) => {
        const { rpc, keypair, hashlist, concurrency } = options.opts();

        const hashlistArray = JSON.parse(readFileSync(hashlist, 'utf-8'));
        const mints: PublicKey[] = hashlistArray.map((mint: string) => publicKey(mint));

        await download_nfts(rpc, keypair, mints, parseInt(concurrency));
    });

const costCmd = program.command('cost');

costCmd.command('nft')
    .description('Calculate the cost of inscribing an NFT')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-m --mint <string>', 'Mint address of the NFT')
    .action(async (str, options) => {
        const { rpc, mint } = options.opts();

        await cost_nfts([publicKey(mint)]);
    });

costCmd.command('hashlist')
    .description('Calculate the cost of inscribing a hashlist')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-h --hashlist <string>', 'The file containing the hashlist')
    .action(async (str, options) => {
        const { rpc, hashlist } = options.opts();

        const hashlistArray = JSON.parse(readFileSync(hashlist, 'utf-8'));
        const mints: PublicKey[] = hashlistArray.map((mint: string) => publicKey(mint));

        await cost_nfts(mints);
    });

const createCmd = program.command('create');

createCmd.command('shards')
    .description('Inscribe an existing NFT')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-k --keypair <string>', 'Solana wallet location')
    .action(create_shards);

const testCmd = program.command('test');

testCmd.command('create_collection')
    .description('Create a test collection')
    .option('-r --rpc <string>', 'The endpoint to connect to.')
    .option('-k --keypair <string>', 'Solana wallet location')
    .option('-c --concurrency <number>', 'Number of concurrent writes to perform', '10')
    .action(async (str, options) => {
        const { rpc, keypair, concurrency } = options.opts();

        await test_createCollection(rpc, keypair, 'cache', parseInt(concurrency));
    });

program.parse(process.argv);