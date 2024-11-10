import db from "@/db/db";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  if (product == null) return notFound();

  // const { size } = await fs.stat(product.filePath)
  // const file = await fs.readFile(product.filePath)
  // const extension = product.filePath.split(".").pop()

  const response = await fetch(product.filePath); // replace this with your API call & options
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  // return new NextResponse(file, {headers: {
  //     "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
  //     "Content-Length": size.toString()
  // }})
  const arrFileName = product.filePath.split("/");
  const fileName = arrFileName[arrFileName.length - 1];
  return new NextResponse(response.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      // "Content-Length": size.toString()
    },
  });
}
