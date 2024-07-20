import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      imagePath: string;
      name: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      pricePaidInCents: 1000,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name 1",
        imagePath:
          "/products/2dc33f14-5e48-4688-ac0e-79821081b5b0-annie-spratt-QckxruozjRg-unsplash.jpg",
        description: "some text description for Product Name 1",
      },
    },
    {
      id: crypto.randomUUID(),
      pricePaidInCents: 2780,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name 2",
        imagePath:
          "/products/369bd295-8742-4412-a4b3-f14759bcc654-bruce-mars-xj8qrWvuOEs-unsplash.jpg",
        description: "some text description for Product Name 2",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview> Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  key={order.id}
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
