import React from 'react';

function Story() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4 transition-colors hover:text-red-700">
          The Story of the Maasai Warriors
        </h1>
        <p className="text-lg text-gray-700 transition-colors hover:text-gray-600">
          Discover the rich history and vibrant traditions of the iconic Maasai culture.
        </p>
      </header>
      <article className="space-y-12">
        <section>
          <img
            className="w-full h-80 object-cover rounded-lg shadow-md mb-6 transform transition-transform duration-300 hover:scale-105"
            src="https://images.pexels.com/photos/27720737/pexels-photo-27720737/free-photo-of-maasai-men.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Maasai warriors performing traditional dance"
          />
          <div className="prose lg:prose-xl transition-colors hover:text-gray-800">
            <p>
              The Maasai are one of the most iconic indigenous communities of Africa, known for their vibrant red shukas, intricate beadwork, and deep-rooted traditions. Central to their identity is the warrior culture—a rite of passage that transforms boys into fearless protectors of the land and their people.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 transition-colors hover:text-gray-600">
            History and Tradition
          </h2>
          <div className="prose lg:prose-xl transition-colors hover:text-gray-800">
            <p>
              For centuries, the Maasai have roamed the plains of Kenya and Tanzania, maintaining a semi-nomadic lifestyle in harmony with nature and wildlife. Their customs, passed down through generations, celebrate bravery, community, and respect for the environment.
            </p>
          </div>
          <img
            className="w-full h-80 object-cover rounded-lg shadow-md mt-6 transform transition-transform duration-300 hover:scale-105"
            src="https://www.shutterstock.com/shutterstock/photos/2309521321/display_1500/stock-photo-africa-masai-mara-reservation-in-kenya-the-masai-mara-tribe-an-old-hut-made-of-clay-and-twigs-2309521321.jpg"
            alt="Maasai elder passing knowledge to a young warrior"
          />
        </section>
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 transition-colors hover:text-gray-600">
            Who is a Maasai Warrior?
          </h2>
          <div className="prose lg:prose-xl transition-colors hover:text-gray-800">
            <p>
              A Maasai warrior, known as a "Moran," undergoes rigorous training and initiation ceremonies to gain his revered status. This transformative journey involves physical endurance, survival skills, and deep spiritual teachings imparted by experienced elders.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 transition-colors hover:text-gray-600">
            Why Become a Warrior?
          </h2>
          <div className="prose lg:prose-xl transition-colors hover:text-gray-800">
            <p>
              In Maasai society, becoming a warrior is a prestigious milestone that marks the transition into adulthood. It signifies responsibility, leadership, and a commitment to upholding cultural values. Warriors are celebrated for their courage, discipline, and the vital role they play in preserving their heritage.
            </p>
          </div>
          <img
            className="w-full h-80 object-cover rounded-lg shadow-md mt-6 transform transition-transform duration-300 hover:scale-105"
            src="https://www.shutterstock.com/shutterstock/photos/258441746/display_1500/stock-photo-south-horr-kenya-january-unidentified-samburu-warrior-with-traditional-headdress-and-258441746.jpg"
            alt="Young Maasai warriors in a traditional dance"
          />
        </section>
        <section className="bg-gray-100 p-6 rounded-lg shadow-inner transition-colors hover:bg-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors hover:text-gray-800">
            Key Facts About the Maasai
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li className="transition-colors hover:text-green-600">Homeland: Kenya and Tanzania</li>
            <li className="transition-colors hover:text-green-600">Traditional Attire: Red shuka and intricate beadwork</li>
            <li className="transition-colors hover:text-green-600">Language: Maa (a Nilotic language)</li>
            <li className="transition-colors hover:text-green-600">Main Economic Activity: Cattle herding</li>
            <li className="transition-colors hover:text-green-600">Rite of Passage: Warrior initiation and age-set transitions</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

export default Story;
