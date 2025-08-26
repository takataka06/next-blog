import {PrismaClient } from '@prisma/client'

// グローバルスコープでPrismaインスタンスを保持する
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

// prismaインスタンスがあれば使う、なければ新規作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
// 開発環境ではグローバルスコープにprismaインスタンス
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma