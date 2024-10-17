const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Criar categorias
  const categoriaCabelo = await prisma.category.create({
    data: {
      name: 'Cabelo',
      imageUrl: 'https://example.com/cabelo.jpg',
    },
  });

  const categoriaBarba = await prisma.category.create({
    data: {
      name: 'Barba',
      imageUrl: 'https://example.com/barba.jpg',
    },
  });

  const categoriaCompleto = await prisma.category.create({
    data: {
      name: 'Completo',
      imageUrl: 'https://example.com/completo.jpg',
    },
  });

  // Criar serviços para a categoria Cabelo
  const serviceCabelo1 = await prisma.service.create({
    data: {
      name: 'Corte de cabelo',
      description: 'Corte de cabelo moderno',
      imageUrl: 'https://example.com/corte.jpg',
      price: 50.00,
      categoryId: categoriaCabelo.id,
    },
  });

  const serviceCabelo2 = await prisma.service.create({
    data: {
      name: 'Penteado',
      description: 'Penteado estiloso para ocasiões especiais',
      imageUrl: 'https://example.com/penteado.jpg',
      price: 60.00,
      categoryId: categoriaCabelo.id,
    },
  });

  // Criar serviços para a categoria Barba
  const serviceBarba1 = await prisma.service.create({
    data: {
      name: 'Aparar barba',
      description: 'Aparar e modelar a barba',
      imageUrl: 'https://example.com/aparobarba.jpg',
      price: 30.00,
      categoryId: categoriaBarba.id,
    },
  });

  const serviceBarba2 = await prisma.service.create({
    data: {
      name: 'Barba e bigode',
      description: 'Cuidados especiais para barba e bigode',
      imageUrl: 'https://example.com/barbaebigode.jpg',
      price: 40.00,
      categoryId: categoriaBarba.id,
    },
  });

  // Criar serviços para a categoria Completo
  const serviceCompleto1 = await prisma.service.create({
    data: {
      name: 'Corte de cabelo + Barba',
      description: 'Corte de cabelo e aparar a barba',
      imageUrl: 'https://example.com/corteebarba.jpg',
      price: 75.00,
      categoryId: categoriaCompleto.id,
    },
  });

  const serviceCompleto2 = await prisma.service.create({
    data: {
      name: 'Corte de cabelo + Penteado + Barba',
      description: 'Corte, penteado e barba',
      imageUrl: 'https://example.com/corteepenteado.jpg',
      price: 100.00,
      categoryId: categoriaCompleto.id,
    },
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  //npx prisma db seed   