// Next.js API route: /api/auth
let usersList = [
  { email: 'admin@mminternational.com', password: 'admin123', name: 'Atelier Admin', role: 'admin' }
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { action, email, password, name } = req.body;
    
    if (action === 'login') {
      const user = usersList.find(u => u.email === email && u.password === password);
      if (user) {
        res.status(200).json({ success: true, user: { email: user.email, name: user.name, role: user.role } });
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    } else if (action === 'signup') {
      const exists = usersList.some(u => u.email === email);
      if (exists) {
        res.status(400).json({ success: false, error: 'User already exists' });
      } else {
        const newUser = { email, password, name, role: 'customer' };
        usersList.push(newUser);
        res.status(201).json({ success: true, user: { email, name, role: 'customer' } });
      }
    } else {
      res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
