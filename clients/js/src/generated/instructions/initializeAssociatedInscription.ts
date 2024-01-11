/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findAssociatedInscriptionAccountPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type InitializeAssociatedInscriptionInstructionAccounts = {
  /** The account where data is stored. */
  inscriptionAccount: PublicKey | Pda;
  /** The account to store the inscription account's metadata in. */
  inscriptionMetadataAccount: PublicKey | Pda;
  /** The account to create and store the new associated data in. */
  associatedInscriptionAccount?: PublicKey | Pda;
  /** The account that will pay for the transaction and rent. */
  payer?: Signer;
  /** The authority of the inscription account. */
  authority?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type InitializeAssociatedInscriptionInstructionData = {
  discriminator: number;
  associationTag: string;
};

export type InitializeAssociatedInscriptionInstructionDataArgs = {
  associationTag: string;
};

export function getInitializeAssociatedInscriptionInstructionDataSerializer(): Serializer<
  InitializeAssociatedInscriptionInstructionDataArgs,
  InitializeAssociatedInscriptionInstructionData
> {
  return mapSerializer<
    InitializeAssociatedInscriptionInstructionDataArgs,
    any,
    InitializeAssociatedInscriptionInstructionData
  >(
    struct<InitializeAssociatedInscriptionInstructionData>(
      [
        ['discriminator', u8()],
        ['associationTag', string()],
      ],
      { description: 'InitializeAssociatedInscriptionInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 8 })
  ) as Serializer<
    InitializeAssociatedInscriptionInstructionDataArgs,
    InitializeAssociatedInscriptionInstructionData
  >;
}

// Args.
export type InitializeAssociatedInscriptionInstructionArgs =
  InitializeAssociatedInscriptionInstructionDataArgs;

// Instruction.
export function initializeAssociatedInscription(
  context: Pick<Context, 'eddsa' | 'payer' | 'programs'>,
  input: InitializeAssociatedInscriptionInstructionAccounts &
    InitializeAssociatedInscriptionInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplInscription',
    '1NSCRfGeyo7wPUazGbaPBUsTM49e1k2aXewHGARfzSo'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    inscriptionAccount: {
      index: 0,
      isWritable: false,
      value: input.inscriptionAccount ?? null,
    },
    inscriptionMetadataAccount: {
      index: 1,
      isWritable: true,
      value: input.inscriptionMetadataAccount ?? null,
    },
    associatedInscriptionAccount: {
      index: 2,
      isWritable: true,
      value: input.associatedInscriptionAccount ?? null,
    },
    payer: { index: 3, isWritable: true, value: input.payer ?? null },
    authority: { index: 4, isWritable: false, value: input.authority ?? null },
    systemProgram: {
      index: 5,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: InitializeAssociatedInscriptionInstructionArgs = {
    ...input,
  };

  // Default values.
  if (!resolvedAccounts.associatedInscriptionAccount.value) {
    resolvedAccounts.associatedInscriptionAccount.value =
      findAssociatedInscriptionAccountPda(context, {
        associationTag: expectSome(resolvedArgs.associationTag),
        inscriptionMetadataAccount: expectPublicKey(
          resolvedAccounts.inscriptionMetadataAccount.value
        ),
      });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data =
    getInitializeAssociatedInscriptionInstructionDataSerializer().serialize(
      resolvedArgs as InitializeAssociatedInscriptionInstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
