/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { stringify } from '../util/stringify';
import { resolveForwardRef } from './forward_ref';
/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 *
 * @deprecated No replacement
 * @publicApi
 */
export class ReflectiveKey {
    /**
     * Private
     */
    constructor(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new RuntimeError(208 /* RuntimeErrorCode.MISSING_INJECTION_TOKEN */, ngDevMode && 'Token must be defined!');
        }
        this.displayName = stringify(this.token);
    }
    /**
     * Retrieves a `Key` for a token.
     */
    static get(token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    }
    /**
     * @returns the number of keys registered in the system.
     */
    static get numberOfKeys() {
        return _globalKeyRegistry.numberOfKeys;
    }
}
export class KeyRegistry {
    constructor() {
        this._allKeys = new Map();
    }
    get(token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        const newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    }
    get numberOfKeys() {
        return this._allKeys.size;
    }
}
const _globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9rZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9yZWZsZWN0aXZlX2tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFtQixNQUFNLFdBQVcsQ0FBQztBQUN6RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2hEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sT0FBTyxhQUFhO0lBRXhCOztPQUVHO0lBQ0gsWUFBbUIsS0FBYSxFQUFTLEVBQVU7UUFBaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDakQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sSUFBSSxZQUFZLHFEQUN3QixTQUFTLElBQUksd0JBQXdCLENBQUMsQ0FBQztTQUN0RjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQWE7UUFDdEIsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLEtBQUssWUFBWTtRQUNyQixPQUFPLGtCQUFrQixDQUFDLFlBQVksQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sV0FBVztJQUF4QjtRQUNVLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztJQWlCdEQsQ0FBQztJQWZDLEdBQUcsQ0FBQyxLQUFhO1FBQ2YsSUFBSSxLQUFLLFlBQVksYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRWpELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQztTQUNsQztRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvciwgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsL3N0cmluZ2lmeSc7XG5cbmltcG9ydCB7cmVzb2x2ZUZvcndhcmRSZWZ9IGZyb20gJy4vZm9yd2FyZF9yZWYnO1xuXG5cbi8qKlxuICogQSB1bmlxdWUgb2JqZWN0IHVzZWQgZm9yIHJldHJpZXZpbmcgaXRlbXMgZnJvbSB0aGUge0BsaW5rIFJlZmxlY3RpdmVJbmplY3Rvcn0uXG4gKlxuICogS2V5cyBoYXZlOlxuICogLSBhIHN5c3RlbS13aWRlIHVuaXF1ZSBgaWRgLlxuICogLSBhIGB0b2tlbmAuXG4gKlxuICogYEtleWAgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IHtAbGluayBSZWZsZWN0aXZlSW5qZWN0b3J9IGJlY2F1c2UgaXRzIHN5c3RlbS13aWRlIHVuaXF1ZSBgaWRgIGFsbG93c1xuICogdGhlXG4gKiBpbmplY3RvciB0byBzdG9yZSBjcmVhdGVkIG9iamVjdHMgaW4gYSBtb3JlIGVmZmljaWVudCB3YXkuXG4gKlxuICogYEtleWAgc2hvdWxkIG5vdCBiZSBjcmVhdGVkIGRpcmVjdGx5LiB7QGxpbmsgUmVmbGVjdGl2ZUluamVjdG9yfSBjcmVhdGVzIGtleXMgYXV0b21hdGljYWxseSB3aGVuXG4gKiByZXNvbHZpbmdcbiAqIHByb3ZpZGVycy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBObyByZXBsYWNlbWVudFxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgUmVmbGVjdGl2ZUtleSB7XG4gIHB1YmxpYyByZWFkb25seSBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogUHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHRva2VuOiBPYmplY3QsIHB1YmxpYyBpZDogbnVtYmVyKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLk1JU1NJTkdfSU5KRUNUSU9OX1RPS0VOLCBuZ0Rldk1vZGUgJiYgJ1Rva2VuIG11c3QgYmUgZGVmaW5lZCEnKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwbGF5TmFtZSA9IHN0cmluZ2lmeSh0aGlzLnRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBgS2V5YCBmb3IgYSB0b2tlbi5cbiAgICovXG4gIHN0YXRpYyBnZXQodG9rZW46IE9iamVjdCk6IFJlZmxlY3RpdmVLZXkge1xuICAgIHJldHVybiBfZ2xvYmFsS2V5UmVnaXN0cnkuZ2V0KHJlc29sdmVGb3J3YXJkUmVmKHRva2VuKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgdGhlIG51bWJlciBvZiBrZXlzIHJlZ2lzdGVyZWQgaW4gdGhlIHN5c3RlbS5cbiAgICovXG4gIHN0YXRpYyBnZXQgbnVtYmVyT2ZLZXlzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIF9nbG9iYWxLZXlSZWdpc3RyeS5udW1iZXJPZktleXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEtleVJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBfYWxsS2V5cyA9IG5ldyBNYXA8T2JqZWN0LCBSZWZsZWN0aXZlS2V5PigpO1xuXG4gIGdldCh0b2tlbjogT2JqZWN0KTogUmVmbGVjdGl2ZUtleSB7XG4gICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUmVmbGVjdGl2ZUtleSkgcmV0dXJuIHRva2VuO1xuXG4gICAgaWYgKHRoaXMuX2FsbEtleXMuaGFzKHRva2VuKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FsbEtleXMuZ2V0KHRva2VuKSE7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3S2V5ID0gbmV3IFJlZmxlY3RpdmVLZXkodG9rZW4sIFJlZmxlY3RpdmVLZXkubnVtYmVyT2ZLZXlzKTtcbiAgICB0aGlzLl9hbGxLZXlzLnNldCh0b2tlbiwgbmV3S2V5KTtcbiAgICByZXR1cm4gbmV3S2V5O1xuICB9XG5cbiAgZ2V0IG51bWJlck9mS2V5cygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hbGxLZXlzLnNpemU7XG4gIH1cbn1cblxuY29uc3QgX2dsb2JhbEtleVJlZ2lzdHJ5ID0gbmV3IEtleVJlZ2lzdHJ5KCk7XG4iXX0=