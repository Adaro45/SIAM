<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld">
  <NamedLayer>
    <Name>myLayer</Name>
    <UserStyle>
      <Title>My Polygon Style</Title>
      <FeatureTypeStyle>
        <Rule>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#9ed2ed</CssParameter> <!-- Color azul -->
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#FFFFFF</CssParameter> <!-- Borde blanco -->
              <CssParameter name="stroke-width">1</CssParameter> <!-- Grosor del borde -->
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>