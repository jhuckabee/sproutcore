// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

sc_require("renderers/renderer");

/** @class
  
  Provides for rendering the default properties of SC.View

  @extends SC.Renderer
  @since SproutCore 1.1
*/
SC.BaseTheme.renderers.View = SC.Renderer.extend({
  
  render: function(context) {
    context
      .id(this.layerId)
      .setClass(this.calculateClassNames())
      .addStyle(this.layoutStyle);
    
    if (this.backgroundColor) {
      context.addStyle('backgroundColor', this.backgroundColor);
    }
    
    this.resetChanges();
  },
  
  update: function() {
    var elem = this.$();
    
    elem
      .setClass(this.calculateClassNames())
      .css(this.layoutStyle);
    
    if (this.didChange('backgroundColor')) {
      elem.css('backgroundColor', this.backgroundColor);
    }
    
    this.resetChanges();
  },
  
  calculateClassNames: function() {
    var classNames = this.classNames;
    
    if (this.didChange('isTextSelectable')) classNames['allow-select'] = this.isTextSelectable;
    if (this.didChange('isEnabled')) classNames['disabled'] = !this.isEnabled;
    if (this.didChange('isVisible')) classNames['hidden'] = !this.isVisible;
    if (this.didChange('isFirstResponder')) classNames['focus'] = this.isFirstResponder;
    if (this.didChange('hasStaticLayout')) classNames['sc-static-layout'] = this.hasStaticLayout;
    if (this.didChange('cursor') && this.cursor) classNames[this.cursor.get('className')] = YES;
    
    this.classNames = classNames;
    return classNames;
  }

});

SC.BaseTheme.renderers.view = SC.BaseTheme.renderers.View.create();