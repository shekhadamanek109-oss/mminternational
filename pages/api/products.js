// Next.js API route: /api/products
let productsList = [
  {
    id: "ring-signature",
    category: "rings",
    title: "The Signature Solitaire",
    price: "$8,500",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    badge: "Exclusive",
    desc: "An iconic symbol of eternal devotion. This signature ring features a brilliant round-cut diamond cradled in an elevated platinum claw setting, designed to catch light from every angle.",
    specs: { metal: "Platinum 950", gemstone: "Round Cut Diamond", carats: "1.80 ct", clarity: "VVS1" },
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600"
    ],
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4"
    ]
  },
  {
    id: "necklace-aurora",
    category: "necklaces",
    title: "Aurora Sapphire Pendant",
    price: "$12,400",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    badge: "Bespoke",
    desc: "Deep royal blue velvet color. This sapphire pendant is haloed by brilliant-cut diamonds, suspended elegantly on an 18-karat white gold chain. Crafted to stand the test of time.",
    specs: { metal: "18k White Gold", gemstone: "Oval Ceylon Sapphire", carats: "2.50 ct", clarity: "Eye-Clean" },
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    id: "earrings-emerald",
    category: "earrings",
    title: "Elysian Emerald Drops",
    price: "$9,200",
    img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600",
    badge: "New",
    desc: "Breathtaking Colombian emerald drop earrings, surrounded by micro-pavé diamonds. These pieces represent the height of luxury, reflecting natural light into deep green reflections.",
    specs: { metal: "18k Yellow Gold", gemstone: "Colombian Emeralds", carats: "3.10 ct", clarity: "F1 Minor" }
  },
  {
    id: "bracelet-eternity",
    category: "bracelets",
    title: "Eternity Gold Bangle",
    price: "$6,800",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    badge: "Classic",
    desc: "A minimalist masterpiece. Sculpted from pure yellow gold with hand-finished high-polish textures, this structured bangle stands as a testament to understated refinement.",
    specs: { metal: "18k Yellow Gold", gemstone: "Micro-diamonds", carats: "0.45 ct", size: "Medium" }
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(productsList);
  } else if (req.method === 'POST') {
    const newProduct = req.body;
    productsList.push(newProduct);
    res.status(201).json({ success: true, product: newProduct });
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    productsList = productsList.filter(p => p.id !== id);
    res.status(200).json({ success: true, message: 'Deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
