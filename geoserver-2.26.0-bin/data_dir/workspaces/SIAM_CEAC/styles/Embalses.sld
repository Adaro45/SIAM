<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>Embalses</Name>
    <UserStyle>
      <Title>Dark Blue polygon</Title>
      <FeatureTypeStyle>
        <Rule>
          <Title>Dark Blue polygon</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#130471</CssParameter>
              <CssParameter name="fill-opacity">0.5</CssParameter> <!-- Opacidad del relleno -->
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
              <CssParameter name="stroke-opacity">1.0</CssParameter> <!-- Opacidad del borde (1.0 es opaco) -->
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>