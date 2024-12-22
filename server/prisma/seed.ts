import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const user = await prisma.user.upsert({
    where: { address: '0x1234567890123456789012345678901234567890' },
    update: {},
    create: {
      address: '0x1234567890123456789012345678901234567890',
    },
  });

  // Create test strategy
  const strategy = await prisma.strategy.create({
    data: {
      userId: user.id,
      asset: 'USDC',
      amount: 1000,
      riskLevel: 'MEDIUM',
      network: 'ETHEREUM',
      status: 'ACTIVE',
      aiResponse: {
        strategy: 'Test strategy content',
        borrowParams: {
          suggestedBorrowAmount: '500',
          maxBorrowAmount: '750',
        },
        gasEstimates: {
          gasLimit: '200000',
          gasPrice: '50000000000'
        }
      },
      validation: {
        isValid: true,
        healthFactor: '2.5',
        warnings: [],
        suggestions: []
      }
    }
  });

  // Create test transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        strategyId: strategy.id,
        type: 'DEPOSIT',
        status: 'CONFIRMED',
        hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        network: 'ETHEREUM',
        data: {
          amount: '1000',
          asset: 'USDC'
        }
      },
      {
        userId: user.id,
        strategyId: strategy.id,
        type: 'BORROW',
        status: 'CONFIRMED',
        hash: '0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
        network: 'ETHEREUM',
        data: {
          amount: '500',
          asset: 'USDC'
        }
      }
    ]
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 