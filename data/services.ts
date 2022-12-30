export interface Service {
  title: string
  body: string
  image: string
  altText: string
  boxPosition: string
  imagePosition: string
  infoPosition: string
  infoBoxPosition: string
  aboveHeading: string
}

export const ourServices = [
  {
    title: 'Airport Services',
    aboveHeading: 'TRAVEL IN COMFORT',
    body: 'No one wants to spend hours in an airport before their flight, but it is inevitable. With a limousine service, you do not need to worry about the time spent at the airport. Drivers are available 24/7 and can pick you up at any terminal. They will also drop you off at your terminal for your departure flight. When flying internationally, the process can be even more daunting with all of the security checks and hours of waiting in line. You will not have to worry about this as long as you are booked with a Luxury Ride Service!',
    image: '/images/Airplane-Toronto-Pearson-Airport.jpg',
    altText: 'Airport-Service',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-2 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-1 md:row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
  {
    title: 'POINT TO POINT',
    aboveHeading: 'ALWAYS BE ON TIME',
    body: 'Point-to-point transfers are an excellent choice for anyone who wants more convenience when it comes to transportation. Many people rely on our company, and we work hard to provide them with a solution that matches up with their needs at all times. We will take care of every one of your needs and make sure that you are happy with what you get.',
    image: '/images/Point-To-Point-Service.jpg',
    altText: 'Point-To-Point',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-1 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-2 row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
  {
    title: 'NIGHT ON THE TOWN',
    aboveHeading: 'ENJOY YOURSELF',
    body: 'Whether it is a birthday, bachelor party, bachelorette party or any other special occasion, we offer transportation for all of these occasions and more. Our drivers have experience catering to those who are celebrating milestones in their lives. Not only will they go out of their way to make sure you have a great time, but they will also help to ensure that you are safe too!',
    image: '/images/Night-On-The-Town-Toronto.jpg',
    boxPosition:
      'md:col-span-1 md:col-start-1 row-start-3 md:grid md:grid-cols-1 mb-8',
    imagePosition: 'md:col-span-1 md:row-start-1 md:max-w-md md:mx-auto',
    infoPosition: 'md:self-stretch md:col-span-1 md:row-start-2',
    infoBoxPosition:
      'bg-white shadow-xl px-4 py-6 md:px-6 lg:px-8 md:mx-2 md:pt-16 md:-mt-16',
  },
  {
    title: 'HOURLY SERVICE',
    aboveHeading: 'HAVE THE DRIVER WAIT',
    body: 'We offer hourly service with a minimum of two hours. Hourly car service is perfect for running errands, going to appointments, or even giving friends and family rides. Hourly service is also excellent for date nights and parties! Suppose you are unsure about what your transportation needs are. In that case, we offer packages that include everything you need to make it convenient.',
    image: '/images/Hourly-Car-Service.jpg',
    altText: 'Hourly-Service',
    boxPosition:
      'md:col-span-1 md:col-start-2 md:row-start-3 md:grid md:grid-cols-1 mb-8',
    imagePosition: 'md:col-span-1 md:row-start-1 md:max-w-md md:mx-auto',
    infoPosition: 'md:col-span-1 md:row-start-2',
    infoBoxPosition:
      'bg-white shadow-xl px-4 py-6 md:px-6 lg:px-8 md:mx-2 md:pt-16 md:-mt-16',
  },
  {
    title: 'CORPORATE TRAVEL',
    aboveHeading: 'DONT WORRY ABOUT MEETINGS',
    body: 'When you require a corporate car service, we offer the solution. We understand how crucial it is for those who work in the business world to be on time and prepared for meetings. Our drivers have years of experience and can adapt to any situation. They will also go out of their way to accommodate your needs, making the experience a great one!',
    image: '/images/Corporate-Travel-Car-Service.jpg',
    altText: 'Corporate-Travel',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-2 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-1 md:row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
  {
    title: 'INTERCITY TRAVEL',
    aboveHeading: 'AVOID THE HASSLE',
    body: 'Intercity travel is a service that we offer for customers looking to get from point A to point B in the shortest possible time. If you are looking for an alternative to trains, planes, and buses, this will be an excellent solution. We take care of every single detail so that you can enjoy your trip. You will get a professional driver, freshly stocked beverages, and you will enjoy our luxurious atmosphere',
    image: '/images/Intercity-Travel-Car-Service.jpg',
    altText: 'Intercity-Travel',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-1 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-2 row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
] as Service[]
