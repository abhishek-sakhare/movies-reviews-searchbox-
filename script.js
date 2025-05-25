new Splide('.splide', {
      type      : 'loop',
      perPage   : 3,
      perMove   : 3,
      autoplay  : true,
      interval  : 5000, // 3 seconds
      pauseOnHover: false,
      pauseOnFocus: false,
      arrows    : false,
      pagination: false,
    }).mount();