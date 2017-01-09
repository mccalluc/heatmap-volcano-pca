define(['heatmap_scatterplot', 'd3'], function (chart, d3) {

  describe('heatmap_scatterplot', function () {
var internals = chart().__internals__;

    beforeEach(function() {
      d3.selectAll('body *').remove()
    });

    describe('matrix_extent', function () {
      it('works', function () {
        expect(internals.matrix_extent([[-1, 0], [0, 1]])).toEqual([-1, 1]);
      });
    });

    describe('heatmap_axes', function () {
      it('works for 1 column degenerate case', function () {
        var matrix = [[1, 2], [3, 4]];
        matrix.columns = ['id', 'col-1'];
        var vis = d3
            .selectAll('body')
            .append('div')
            .data([matrix])
            .call(internals.heatmap_axes);

        expect(vis.size()).toEqual(1);
        var svg = d3.select('svg');
        expect(svg.attr('height')).toEqual('50');
        expect(svg.node().innerHTML).toEqual(
            '<g transform="translate(0,50)">' +
            '<g text-anchor="end" font-family="sans-serif" font-size="10" fill="none">' +
            '<g transform="translate(0,0)" opacity="1" class="tick">' +
            '<text style="' +
            'transform: rotate(90deg); font-weight: bold; cursor: default;' +
            '" dy="0em" x="0.5" y="-9" fill="#000">col-1</text>' +
            '</g></g></g>');
      });

      it('works for 3 column realistic case', function () {
        var matrix = [[0, 1, 2, 3]];
        matrix.columns = ['id', 'col-X', 'col-2', 'col-3', 'col-4'];
        var vis = d3
            .selectAll('body')
            .append('div')
            .data([matrix])
            .call(internals.heatmap_axes);

        expect(vis.size()).toEqual(1);
        var svg = d3.select('svg');
        expect(svg.attr('height')).toEqual('50');
        // expect(svg.node().innerHTML).toEqual(
        //     '<g transform="translate(0,50)">' +
        //     '<g text-anchor="end" font-family="sans-serif" font-size="10" fill="none">' +
        //     '<g transform="translate(0,0)" opacity="1" class="tick">' +
        //     '<text style="' +
        //     'transform: rotate(90deg); font-weight: bold; cursor: default;' +
        //     '" dy="0em" x="0.5" y="-9" fill="#000">col-1</text>' +
        //     '</g></g></g>');
      });
    });
  });

});