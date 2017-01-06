define(['heatmap_scatterplot', 'd3'], function (chart, d3) {
  var internals = chart().__test__;

  describe('matrix_extent', function () {
    it('works', function () {
      expect(internals.matrix_extent([[-1, 0], [0, 1]])).toEqual([-1, 1]);
    });
  });

  describe('heatmap_axes', function () {
    it('works', function () {
      var div = document.createElement('div');
      var vis = d3
          .selectAll('div')
          .data([[1,2],[3,4]])
          .call(internals.heatmap_axes);
      // TODO:
      expect(vis.node()).toEqual(null);
      expect(div.innerHTML).toEqual('');
    });
  });
});