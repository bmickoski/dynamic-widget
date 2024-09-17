import {
  Component,
  ComponentRef,
  contentChild,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  Type,
  viewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { WidgetComponent } from './widget/widget.component';
import { AddWidgetModalComponent } from './add-widget-modal/add-widget-modal.component';
import { Widget } from '../../models/widget.model';
import { WeatherComponent } from './widgets/weather/weather.component';
import { WidgetType } from './widgets/widget-type-enum';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { WidgetStore } from './widget/widget.store';

type DynamicComponent = typeof WeatherComponent;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WidgetComponent,
    AddWidgetModalComponent,
    WeatherComponent,
    NgTemplateOutlet,
    NgComponentOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  widgetStore = inject(WidgetStore);
  // widgets = this.widgetStore.widgets();
  widgets = this.widgetStore.widgets();
  vcr = viewChild('widgetContainer', { read: ViewContainerRef });
  componentsRefs = Array<ComponentRef<WidgetComponent>>();
  widgetIndex: number = 0;
  showAddModal: boolean = false;
  content = viewChild<TemplateRef<WeatherComponent>>('widgetContent');
  widgetComponent!: DynamicComponent;
  wdgComponent = WidgetComponent;

  ngOnInit(): void {
    this.widgets.forEach((widget) => this.createWidget(widget));
  }
  createWidget(widget: Widget): void {
    this.showAddModal = false;
    this.widgetComponent = this.getWidgetComponent(widget.widget);
    const contentView = this.vcr()?.createEmbeddedView(this.content()!);

    if (contentView) {
      const componentRef = this.vcr()?.createComponent(WidgetComponent, {
        projectableNodes: [contentView.rootNodes],
      });
      componentRef?.setInput('title', widget.title);
      componentRef?.setInput('description', widget.description);
      componentRef?.setInput('index', ++this.widgetIndex);
      this.componentsRefs.push(componentRef as ComponentRef<WidgetComponent>);

      this.widgetStore.updateWidgets({ ...widget, index: ++this.widgetIndex });
      componentRef?.instance.remove.subscribe((index) =>
        this.removeWidget(index)
      );
    }
  }
  removeWidget(index: number): void {
    if (this.vcr()?.length) {
      const componentRef = this.componentsRefs.find(
        (cr) => cr.instance.index() === index
      );
      if (componentRef) {
        const vcrIndex = this.vcr()?.indexOf(componentRef?.hostView as ViewRef);
        if (index !== -1) {
          this.vcr()?.remove(vcrIndex);
          this.componentsRefs = this.componentsRefs.filter(
            (cr) => cr.instance.index() !== index
          );
        }
      }
    }
  }
  removeAllWidgets(): void {
    this.vcr()?.clear();
    this.widgetIndex = 0;
    this.widgetStore.removeWidgets();
  }

  getWidgetComponent(widget: WidgetType): DynamicComponent {
    let cmp!: DynamicComponent;
    switch (widget) {
      case WidgetType.Weather:
        cmp = WeatherComponent;
        break;
      default:
        break;
    }

    return cmp;
  }
}
