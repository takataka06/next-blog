import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 12);

  // ダミー画像
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400"
  ]

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "First Post",
            content: "This is the content of the first post.",
            topImage: dummyImages[0],
            published: true,
          },
          {
            title: "Second Post",
            content: "This is the content of the second post.",
            topImage: dummyImages[1],
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });