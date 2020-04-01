import { toJS } from 'mobx';
import { IEmbeddedDumpSchema } from '../embed/interfaces';
import Store, { stripDefaults } from '../store/Store';
import exportHelper from './exportHelper';
import { compressToEncodedURIComponent } from 'lz-string';

export function toEmbeddedDump(store: Store): IEmbeddedDumpSchema {
  const helper = exportHelper(store);
  const ds = store.dataset!;

  return {
    name: ds.name,
    description: ds.description,
    author: ds.author,
    elements: helper.elems,
    sets: helper.sets.map((set) => ({
      ...set,
      elems: set.elems.map(helper.toElemIndex),
    })),
    combinations: toJS(store.combinationsOptions),
    props: stripDefaults(store.props),
    selection: store.hover ? helper.toSetRef(store.hover) : undefined,
    queries: store.visibleQueries.map((q) => ({
      name: q.name,
      color: q.color,
      set: helper.toSetRef(q.set),
    })),
  };
}

export default function shareEmbedded(store: Store) {
  const r = toEmbeddedDump(store);
  const arg = compressToEncodedURIComponent(JSON.stringify(r));
  const url = new URL(window.location.toString());
  url.hash = '';
  url.pathname = 'embed.html';
  url.searchParams.set('props', arg);
  url.toString();

  const a = document.createElement('a');
  a.href = url.toString();
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}