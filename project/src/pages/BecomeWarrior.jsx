import React, { useState } from "react";

function BecomeWarrior() {
  const benefits = [
    {
      title: "Official Maasai Warrior Certificate",
      description:
        "📜 Earn a prestigious certificate officially recognized by the Maasai community, symbolizing your warrior status.",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuvifszIMpn0vp-1OZlvxLyg-bxmzPY2B05Q&s",
    },
    {
      title: 'A square inch of land',
      description: '🌍 Own a Piece of Maasai Heritage. Secure a symbolic stake in Maasai land, representing your dedication to cultural preservation and conservation efforts. Immerse yourself in authentic warrior traditions through exclusive access to sacred ceremonies.',
      imgSrc: 'https://www.siyabona.com/images/olonana-tented-safari-camp-cultural-visit-500x300.jpg?t=1737116029',
      alt: 'Square Inch Land',
    },
    {
      title: 'Special Merchandise Discounts 🛍️',
      description: '🔥 Exclusive Warrior Gear & Handcrafted Artifacts 🔥. Gain privileged access to authentic Maasai warrior merchandise. Enjoy special discounts as part of this elite community.',
      imgSrc: 'https://img.freepik.com/free-vector/collection-six-discount-stickers_23-2147733610.jpg',
      alt: 'Merchandise Discounts',
    },
    {
      title: 'One acre of conservancy',
      description: '🏞️ Preserve, Protect, and Belong. Claim one acre of protected Maasai conservancy as a symbol of your warrior commitment.',
      imgSrc: 'https://www.shutterstock.com/shutterstock/photos/77553103/display_1500/stock-photo-landscape-of-samburu-before-storm-samburu-kenya-77553103.jpg',
      alt: 'Conservancy Land',
    },
    {
      title: 'Limited Spots Available',
      description: '⚡ Scarcity Makes Legends—Secure Your Title! Only a select number of honorary warrior titles are awarded.',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCuj2QLuT0IvU81EtHqUT-jvwv-uWuzGEjCg&s',
      alt: 'Limited Spots',
    },
    {
      title: 'Wooden Warrior Certificate 🏆',
      description: '🔥 Honor. Legacy. Authenticity. 🔥 Receive a handcrafted wooden certificate symbolizing your official recognition.',
      imgSrc: 'https://www.shutterstock.com/shutterstock/photos/297531665/display_1500/stock-photo-close-up-of-person-hands-using-stamper-on-document-with-the-text-approved-297531665.jpg',
      alt: 'Wooden Certificate',
    }
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    phone: "",
    reason: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        age: calculateAge(formData.dob),
        phone: formData.phone,
        reason: formData.reason,
      };

      const response = await fetch("http://localhost:5000/api/warrior-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Application sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          dob: "",
          phone: "",
          reason: "",
        });
      } else {
        setMessage(data.error || "Error submitting application. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Error submitting application. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-700">
          🌍 Become a Maasai Warrior
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Step into the legacy—embrace the spirit, culture, and strength of the Maasai warriors!
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={benefit.imgSrc}
              alt={benefit.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {benefit.title}
            </h3>
            <p className="text-gray-600 mt-2">{benefit.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🏹 Warrior Application
        </h2>
        <p className="text-lg text-center text-gray-600 mb-6">
          Secure your honorary warrior title today!
        </p>

        {message && (
          <div
            className={`p-4 rounded mb-4 text-center ${
              message.startsWith("Application sent") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Why do you want to become a Maasai Warrior?
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-300"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}

export default BecomeWarrior;
