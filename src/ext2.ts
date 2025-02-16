import { Operation } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client/extension';

type MyArgs = { args2: string };

type OptionalOperation = Operation & 'findMany';

type OptionalArgsFunction<O extends OptionalOperation> = <T, A>(
  this: T,
  args?: Prisma.Exact<A, Prisma.Args<T, O> & MyArgs>
) => Promise<Prisma.Result<T, A, O>>;

type ModelExtension = {
  [O in OptionalOperation]: OptionalArgsFunction<O>;
};

export default Prisma.defineExtension({
  name: 'ext2',
  model: {
    $allModels: {} as ModelExtension,
  },
});
