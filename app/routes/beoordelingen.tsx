import { testimonials } from "~/data/testimonials";

export default function Testimonials() {
  const averageRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length;

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8">Beoordelingen</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
            <p className="text-gray-600">Gemiddelde beoordeling</p>
          </div>
          <div className="text-right">
            <p className="text-lg">{testimonials.length} beoordelingen</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{testimonial.author}</h3>
                <p className="text-gray-600">{testimonial.service}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{testimonial.rating}</p>
                <p className="text-sm text-gray-500">
                  {new Date(testimonial.date).toLocaleDateString('nl-NL')}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
