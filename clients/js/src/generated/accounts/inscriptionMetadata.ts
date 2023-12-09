/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  option,
  publicKey as publicKeySerializer,
  string,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  InscriptionState,
  InscriptionStateArgs,
  Key,
  KeyArgs,
  getInscriptionStateSerializer,
  getKeySerializer,
} from '../types';

export type InscriptionMetadata = Account<InscriptionMetadataAccountData>;

export type InscriptionMetadataAccountData = {
  key: Key;
  bump: number;
  state: InscriptionState;
  inscriptionNumber: Option<bigint>;
  inscriptionBump: Option<number>;
  updateAuthorities: Array<PublicKey>;
};

export type InscriptionMetadataAccountDataArgs = {
  key: KeyArgs;
  bump: number;
  state: InscriptionStateArgs;
  inscriptionNumber: OptionOrNullable<number | bigint>;
  inscriptionBump: OptionOrNullable<number>;
  updateAuthorities: Array<PublicKey>;
};

export function getInscriptionMetadataAccountDataSerializer(): Serializer<
  InscriptionMetadataAccountDataArgs,
  InscriptionMetadataAccountData
> {
  return struct<InscriptionMetadataAccountData>(
    [
      ['key', getKeySerializer()],
      ['bump', u8()],
      ['state', getInscriptionStateSerializer()],
      ['inscriptionNumber', option(u64())],
      ['inscriptionBump', option(u8())],
      ['updateAuthorities', array(publicKeySerializer())],
    ],
    { description: 'InscriptionMetadataAccountData' }
  ) as Serializer<
    InscriptionMetadataAccountDataArgs,
    InscriptionMetadataAccountData
  >;
}

export function deserializeInscriptionMetadata(
  rawAccount: RpcAccount
): InscriptionMetadata {
  return deserializeAccount(
    rawAccount,
    getInscriptionMetadataAccountDataSerializer()
  );
}

export async function fetchInscriptionMetadata(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<InscriptionMetadata> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'InscriptionMetadata');
  return deserializeInscriptionMetadata(maybeAccount);
}

export async function safeFetchInscriptionMetadata(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<InscriptionMetadata | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists
    ? deserializeInscriptionMetadata(maybeAccount)
    : null;
}

export async function fetchAllInscriptionMetadata(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<InscriptionMetadata[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'InscriptionMetadata');
    return deserializeInscriptionMetadata(maybeAccount);
  });
}

export async function safeFetchAllInscriptionMetadata(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<InscriptionMetadata[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeInscriptionMetadata(maybeAccount as RpcAccount)
    );
}

export function getInscriptionMetadataGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'mplInscription',
    '1NSCRfGeyo7wPUazGbaPBUsTM49e1k2aXewHGARfzSo'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      key: KeyArgs;
      bump: number;
      state: InscriptionStateArgs;
      inscriptionNumber: OptionOrNullable<number | bigint>;
      inscriptionBump: OptionOrNullable<number>;
      updateAuthorities: Array<PublicKey>;
    }>({
      key: [0, getKeySerializer()],
      bump: [1, u8()],
      state: [2, getInscriptionStateSerializer()],
      inscriptionNumber: [3, option(u64())],
      inscriptionBump: [null, option(u8())],
      updateAuthorities: [null, array(publicKeySerializer())],
    })
    .deserializeUsing<InscriptionMetadata>((account) =>
      deserializeInscriptionMetadata(account)
    );
}

export function findInscriptionMetadataPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    /** The address of the Inscription Account */
    inscriptionAccount: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'mplInscription',
    '1NSCRfGeyo7wPUazGbaPBUsTM49e1k2aXewHGARfzSo'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('Inscription'),
    publicKeySerializer().serialize(programId),
    publicKeySerializer().serialize(seeds.inscriptionAccount),
  ]);
}

export async function fetchInscriptionMetadataFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findInscriptionMetadataPda>[1],
  options?: RpcGetAccountOptions
): Promise<InscriptionMetadata> {
  return fetchInscriptionMetadata(
    context,
    findInscriptionMetadataPda(context, seeds),
    options
  );
}

export async function safeFetchInscriptionMetadataFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findInscriptionMetadataPda>[1],
  options?: RpcGetAccountOptions
): Promise<InscriptionMetadata | null> {
  return safeFetchInscriptionMetadata(
    context,
    findInscriptionMetadataPda(context, seeds),
    options
  );
}
