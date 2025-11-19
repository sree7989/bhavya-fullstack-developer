import { NextResponse } from "next/server";
import db from "../../../data/db";
 // Make sure db.js is in root /data folder or adjust path

/**
 * Handles POST requests to add a new Investor Visa to the database.
 */
export async function POST(req) {
  try {
    const data = await req.json();

    const {
      name,
      slug,
      description,
      descriptionImage,
      descriptionImageWidth,
      descriptionImageHeight,
      descriptionImagePosition,
      info,
      metaTitle,
      metaDescription,
      metaKeywords,
      image,
      addonHeading,
      addonDescription
    } = data;

    const stmt = db.prepare(`
      INSERT INTO visas 
      (name, slug, description, descriptionImage, descriptionImageWidth, descriptionImageHeight, descriptionImagePosition, info, metaTitle, metaDescription, metaKeywords, image, addonHeading, addonDescription)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      slug,
      description,
      descriptionImage,
      descriptionImageWidth,
      descriptionImageHeight,
      descriptionImagePosition,
      info,
      metaTitle,
      metaDescription,
      metaKeywords,
      image,
      addonHeading,
      addonDescription
    );

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error("Failed to add Investor Visa:", error);
    return NextResponse.json({ success: false, error: "Failed to add Investor Visa" }, { status: 500 });
  }
}
