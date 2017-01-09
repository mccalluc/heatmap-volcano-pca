define(['heatmap_scatterplot', 'd3'], function (chart, d3) {

  describe('heatmap_scatterplot', function () {
    var internals = chart().__internals__;

    beforeEach(function () {
      d3.selectAll('body *').remove()
    });

    describe('matrix_extent', function () {
      it('works', function () {
        matrix = [
          {id: 'foo', a: '-1', b: '0'},
          {id: '42', a: '0', b: '1'}
        ];
        matrix.columns = ['id', 'a', 'b'];
        expect(internals.matrix_extent(matrix)).toEqual([-1, 1]);
      });
    });

    describe('heatmap', function () {
      describe('heatmap_axes', function () {
        function gg(content) {
          return '<g transform="translate(0,50)">' +
              '<g text-anchor="end" font-family="sans-serif" font-size="10" fill="none">' +
              content +
              '</g></g>';
        }

        function translate(t, content) {
          return '<g transform="translate(' + t + ',0)" opacity="1" class="tick">' + content + '</g>';
        }

        function default_text(content) {
          return '<text style="' +
              'transform: rotate(90deg); font-weight: bold; cursor: default;' +
              '" dy="0em" x="0.5" y="-9" fill="#000">' + content + '</text>';
        }

        function pointer_text(content) {
          return '<text style="' +
              'transform: rotate(90deg); cursor: pointer;' +
              '" dy="0em" x="0.5" y="-9" fill="#000">' + content +
              '<title>alt-click to change x-axis</title></text>';
        }

        it('works for 1 column degenerate case', function () {
          var matrix = ['not used here'];
          matrix.columns = ['id', 'col-1'];
          var vis = d3
              .select('body')
              .data([matrix])
              .call(internals.heatmap_axes);

          expect(vis.size()).toEqual(1);
          expect(vis.select('svg').node().innerHTML).toEqual(
              gg(translate(0, default_text('col-1')))
          );
        });

        it('works for 3 column realistic case', function () {
          var matrix = ['not used here'];
          matrix.columns = ['id', 'col-1', 'col-2', 'col-3', 'col-4'];
          var vis = d3
              .select('body')
              .data([matrix])
              .call(internals.heatmap_axes);

          expect(vis.size()).toEqual(1);
          expect(vis.select('svg').node().innerHTML).toEqual(
              gg(
                  translate(0, default_text('col-1'))
                  + translate(75, default_text('col-2'))
                  + translate(150, pointer_text('col-3'))
                  + translate(225, pointer_text('col-4'))
              )
          );
        });
      });

      describe('heatmap_body', function () {
        function context(vis) {
          var node = vis.select('canvas').node();
          return node.getContext('2d')
        }

        function canvas(vis) {
          return context(vis).canvas;
        }

        function pixel(vis, x, y) {
          return Array.from(context(vis).getImageData(x, y, 1, 1).data);
        }

        it('colors canvas from blue to red', function () {
          var matrix = [{id: 42, neg: -1, zero: 0, pos: 2}];
          matrix.columns = ['id', 'neg', 'zero', 'pos'];
          var vis = d3
              .select('body')
              .data([matrix])
              .call(internals.heatmap_body);

          expect(vis.size()).toEqual(1);

          expect(canvas(vis).width).toEqual(3);
          expect(canvas(vis).height).toEqual(1);

          expect(pixel(vis, 0, 0)).toEqual([128, 128, 255, 255]); // pale blue
          expect(pixel(vis, 1, 0)).toEqual([255, 255, 255, 255]); // white
          expect(pixel(vis, 2, 0)).toEqual([255, 0, 0, 255]); // red
        });
      });
    });

    describe('scatterplot', function () {
      describe('scatterplot_axes', function () {
        function handle(a, b) {
          return '<rect style="display: none;" cursor="' + a + '-resize" ' +
              'class="handle handle--' + b + '"></rect>';
        }

        it('works', function () {
          var matrix = [{id: 42, neg: -1, zero: 0, pos: 2}];
          matrix.columns = ['id', 'neg', 'zero', 'pos'];
          var vis = d3
              .selectAll('body')
              .append('div')
              .data([matrix])
              .call(internals.scatterplot_axes);

          expect(vis.size()).toEqual(1);
          expect(vis.select('svg').node().innerHTML).toEqual(
              '<g transform="translate(50,50)">' +
              '<g text-anchor="middle" font-family="sans-serif" font-size="10" fill="none" transform="translate(0,300)">' +
              '<path d="M0.5,6V0.5H300.5V6" stroke="#000" class="domain">' +
              '</path></g>' +
              '<g text-anchor="end" font-family="sans-serif" font-size="10" fill="none">' +
              '<path d="M-6,300.5H0.5V0.5H-6" stroke="#000" class="domain">' +
              '</path></g>' +
              '<text style="text-anchor: middle; cursor: default;" transform="translate(150,337.5)">neg</text>' +
              '<text style="text-anchor: middle; cursor: default;" transform="translate(-37.5,150) rotate(90)">zero</text>' +
              '<g pointer-events="all" fill="none" class="brush">' +
              '<rect height="300" width="300" y="0" x="0" cursor="crosshair" pointer-events="all" class="overlay"></rect>' +
              '<rect style="display: none;" shape-rendering="crispEdges" stroke="#fff" fill-opacity="0.3" fill="#777" cursor="move" class="selection"></rect>' +
              handle('ns', 'n') +
              handle('ew', 'e') +
              handle('ns', 's') +
              handle('ew', 'w') +
              handle('nwse', 'nw') +
              handle('nesw', 'ne') +
              handle('nwse', 'se') +
              handle('nesw', 'sw') +
              '</g></g>'
          );
        });

      });
      describe('scatterplot_body', function () {
//TODO
      });

    })

  });

});