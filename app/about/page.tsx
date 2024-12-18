export default function Page() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0, padding: 0 }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url(/images/landing_page/landing_page_01.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '3rem', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          About Luxury Hotel
        </h1>
      </div>

      {/* Content Section */}
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
          Luxury Hotel is more than a place to stay – it’s an experience crafted to inspire and indulge. 
          With a legacy of excellence in hospitality, we take pride in offering world-class service, 
          timeless elegance, and a welcoming atmosphere that feels like home.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
          Every detail at Luxury Hotel is designed with our guests in mind, from the exquisite architecture 
          to the personalized touches that make every stay unique. Our mission is simple: to provide a haven 
          of comfort, sophistication, and unforgettable memories for travelers from around the world.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
          Discover a place where luxury meets heart. Welcome to Luxury Hotel.
        </p>
      </div>
    </div>
  );
}
