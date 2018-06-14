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
  const isEveryVoteZero = options.every(option => option.votes.length === 0);
  const votes = isEveryVoteZero ? options.map(option => 1) : options.map(option => option.votes.length);
  return {
    labels,
    datasets: [{
      data: votes,
      backgroundColor,
    }],
  };
};
