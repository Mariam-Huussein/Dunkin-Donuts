import { Heart, People, Award, Clock } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";

const values = [
  {
    icon: <Heart size={32} className="icon" />,
    title: "Quality First",
    description:
      "We use only the finest, freshest ingredients sourced from local suppliers.",
  },
  {
    icon: <People size={32} className="icon" />,
    title: "Community Focus",
    description:
      "We're proud to be part of this community and give back whenever we can.",
  },
  {
    icon: <Award size={32} className="icon" />,
    title: "Excellence",
    description:
      "We strive for excellence in every dish, every service, every interaction.",
  },
  {
    icon: <Clock size={32} className="icon" />,
    title: "Tradition",
    description:
      "Our recipes blend time-honored traditions with modern culinary innovation.",
  },
];

export default function ValuesSection() {
  return (
      <Container className="values-container">
      <div className="text-center mb-5">
        <span className="badge mb-3">Our Values</span>
        <h2 className="title fw-bold mb-4">What Drives Us</h2>
        <p className="text-muted">These core values guide everything we do, from sourcing ingredients to serving our community.</p>
      </div>

      <div className="about-row row g-4 mx-auto">
        {values.map((value, index) => (
          <div key={index} className="col-12 col-md-6">
            <div className="about-card card h-100 text-center p-4">
              <div className="mb-3">{value.icon}</div>
              <h5 className="fw-semibold">{value.title}</h5>
              <p className="text-muted small">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
      </Container>
  );
}
