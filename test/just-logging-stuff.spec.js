describe('Promise handlers and async/wait ordering', () => {
  it('can be surprising how Promise.all() resolved', async () => {
    console.log('Setting up promises');

    Promise.all([1]).then(console.warn);
    Promise.all([Promise.all([1])]).then(console.warn);
    Promise.all([true]).then(console.warn);
    Promise.all([]).then(console.warn);

    console.log('Waiting a bit for stuff to settle ;)');

    await Promise.all(['This is here so the test does not end before all logging']);

    console.log('All done here!');
  });
})