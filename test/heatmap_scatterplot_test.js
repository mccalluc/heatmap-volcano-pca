define(['heatmap_scatterplot'], function (chart) {
  describe('matrix_extent', function () {
    it('works', function () {
      expect(chart.__test__.matrix_extent([[-1,0],[0,1]])).toEqual([-1,1]);
    });
  });
});