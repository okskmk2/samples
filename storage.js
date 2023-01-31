/**
 * @author Eunsung Lee
 */
class Storage {
    data = [];
    #storageName;
    #autoCommit;
    constructor(storageName, config = {}) {
        this.#storageName = storageName;
        const { autoCommit } = config;
        this.#autoCommit = autoCommit ?? true;
        const s = localStorage.getItem(storageName);
        if (!s) {
            this.commit();
        } else {
            try {
                this.data = JSON.parse(s);
            } catch (error) {
                this.commit();
            }
        }
    }

    get storageName() {
        return this.#storageName;
    }

    set storageName(name) {
        throw new Error('storageName cannot be changed.');
    }


    commit() {
        localStorage.setItem(this.#storageName, JSON.stringify(this.data));
    }
    get(uuid) {
        const index = this.data.findIndex(v => v.uuid === uuid);
        if (index > -1) {
            return this.data[index];
        }
    }

    add(data) {
        this.data.push({
            ...data,
            uuid: crypto.randomUUID()
        });
        if (this.#autoCommit) {
            this.commit();
        }
    }
    update(uuid, data) {
        const index = this.data.findIndex(v => v.uuid === uuid);
        if (index > -1) {
            delete data.uuid;
            Object.assign(this.data[index], data);
            if (this.#autoCommit) {
                this.commit();
            }
        }
    }
    remove(uuid) {
        const index = this.data.findIndex(v => v.uuid === uuid);
        if (index > -1) {
            this.data.splice(index, 1);
            if (this.#autoCommit) {
                this.commit();
            }
        }
    }

}