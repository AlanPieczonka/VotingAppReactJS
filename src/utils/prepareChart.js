const backgroundColor = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
];


export default (options) => {
  const labels = options.map(option => option.title);
  const votes = options.map(option => option.votes);
  return {
    labels,
    datasets: [{
      data: votes,
      backgroundColor,
    }],
  };
};
