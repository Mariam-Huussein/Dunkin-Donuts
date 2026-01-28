const MapSection = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.315053179063!2d-70.99465768454416!3d42.25287707918557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a6b2d2c3f1d%3A0x3b8b3b8b3b8b3b8b!2s543+Southern+Artery%2C+Quincy%2C+MA+02169%2C+USA!5e0!3m2!1sen!2seg!4v1633028400000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Dunkin' Donuts Original Location"
      ></iframe>
    </div>
  );
}

export default MapSection