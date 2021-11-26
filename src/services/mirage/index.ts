import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  telephone: string;
  password: string;
  role: string;
  position: string;
  biography: string;
  created_at: string;
  updated_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        telephone() {
          return faker.phone.phoneNumber('!##!######-####');
        },
        password() {
          return faker.internet.password();
        },
        role() {
          return faker.random.arrayElements(['Admin', 'Assinante', 'Mentor'], 1);
        },
        position() {
          return faker.name.jobTitle();
        },
        biography() {
          return faker.lorem.paragraphs(3);
        },
        createdAt() {
          return faker.date.recent(10)
        },
        updatedAt() { },
      })
    },

    seeds(server) {
      server.createList('user', 100);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.sort((a, b) => a.createAt - b.createAt).slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });


      this.get('/users/:id');
      this.post('/users');

      this.namespace = '';
      this.passthrough()
    }
  });

  return server;
}