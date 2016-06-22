const {Chromatic} = Package['mdg:chromatic-api'] || {};
SvgController = Package['loredanacirstea:svgtest'].SvgController


if (Chromatic) {
  Chromatic.add(SvgController, {
    type: 'svg',
    specs: [
      new Chromatic.Spec('SVGCircle 1', {props:
        {
          size: 50,
          x: 300,
          y: 300,
          color: '#cccccc'
        }
      }),
      new Chromatic.Spec('SVGCircle 2', {props:
        {
          size: 50,
          x: 200,
          y: 200,
          color: 'rgb(23,200,450)'
        }
      }),
      new Chromatic.Spec('SVGCircle 3', {props:
        {
          size: 50,
          x: 300,
          y: 200,
          color: '#C55458'
        }
      })
    ]
  });

}

