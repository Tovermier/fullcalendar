
var ResourceView = fcViews.resource = AgendaView.extend({
	initialize: function() {
		this.cellToDate = function() {
			return this.start.clone();
		};
	},

	resources: function() {
		this._resources = this._resources || this.calendar.fetchResources();
		return this._resources;
	},

	hasResource: function(event, resource) {
		if(this.opt('hasResource')) {
			return this.opt('hasResource').apply(this, arguments);
		}

		return event.resources && $.grep(event.resources, function(id) {
			return id == resource.id;
		}).length;
	},

	// Called when a new selection is made. Updates internal state and triggers handlers.
	reportSelection: function(range, ev, resources) {
		this.isSelected = true;

		this.calendar.trigger.apply(
			this.calendar, ['select', this, range.start, range.end, ev, this, resources]
		);
	},

	// Used by the `headHtml` method, via RowRenderer, for rendering the HTML of a day-of-week header cell
	headCellHtml: function(row, col, date) {
		var resource = this.resources()[col];
		var classes = [
			'fc-day-header',
			this.widgetHeaderClass,
			'fc-' + dayIDs[date.day()]
		];

		if(resource) {
			classes.push(resource.className);
		}

		return '' +
			'<th class="'+ classes.join(' ') +'">' +
			((resource) ? htmlEscape(resource.name) : '') +
			'</th>';
	}

});
