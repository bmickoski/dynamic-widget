import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  title = input<string>('Title');
  description = input<string>('Description');
  index = input<number>(0);
  remove = output<number>();
}
